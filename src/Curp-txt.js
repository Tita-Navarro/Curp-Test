const fs = require('fs'); // modulo que nos permite acceder al sistema de archivos para poder leer sus contenidos y crear otros archivos o carpetas.
const path = require('path'); // Incluir modulo de path (ubicación exacta de un archivo.)
const filePath = process.argv[2]; //It´s like get an element by Id in JS.//process.argv es un arreglo que contiene los argumentos de linea de comando.// posición para obtener el archvivo con extensión .md
const options = process.argv[3]; // contiene argunmentos en este caso stats y validate, //contiene la funcion de readFile
const fetch = require('node-fetch'); // modulo fetch requiere instalación
var myProcData;

//Function to verificated that it´s an .md file
const validateFileMd = (filePath) => {
  if (filePath === undefined) {
    return console.log('Enter a file');
  } else {
    const fileExtencion = path.extname(filePath);

    if (fileExtencion != '.md') {
      console.log('It´s not an .md file');
      return false;
    } else {
      console.log('It´s an .md file');
      return true;
    }
  }
};
validateFileMd(filePath);

// Function to know if it is file or directory
const directoryOrFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      }
      if (stats.isDirectory()) {
        console.log('it is a directory');
        return true;
      }
      if (stats.isFile()) {
        console.log('it is a file');
        resolve(stats.isFile());
      }
    });
  });
};

directoryOrFile(filePath);

// console.log(path.isAbsolute(filePath));

// function to verificated that path is absolute
// const pathIsAbsolute = (filePath) => {
//   if (path.isAbsolute(filePath)) {
//     console.log('path is absolute');
//     return true;
//   } else {
//     console.log('path is not absolute');
//     return false;
//   }
// };
// pathIsAbsolute(filePath);

//function that extracts the links
const getLinks = (filePath, data) => {
  const rExText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
  const rExLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
  const toString = data.toString();
  const text = toString.match(rExText); //  text
  const links = toString.match(rExLink); // url
  var myReturnData = [];
  for (let i = 0; i < links.length; i++) {
    var myLinkData = {
      text: text[i],
      link: links[i],
      file: filePath,
    };
    myReturnData.push(myLinkData);
  }
  return myReturnData;
};

// function to read file .md
const readCompletePath = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log('Found links:');
      myProcData = getLinks(filePath, data);
      console.log(myProcData);
    });
  });
}
readCompletePath(filePath);

// //function  fetch response status
const readPathStatus = (filePath)  => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log('Found links:');
      myProcData = getLinks(filePath, data);
      // console.log(myProcData);
      for (let i = 0; i < myProcData.length; i++) {
        fetch(myProcData[i].link).then(response => {
          if (response.status == 200) {
            console.log(
              `File: ${filePath}\n Text:${myProcData[i].text}\n Link: ${
                myProcData[0].link
              }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          } else if (response.status == 404 || response.status == 400) {
            console.log(
              `File: ${filePath}\n Text:${myProcData[i].text}\n Link: ${
                myProcData[0].link
              }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          }
        });
      }
    });
  });
}

// //function  fetch response status
const functionStats = (filePath)  =>{
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());

      myProcData = getLinks(filePath, data);

      let wrongLinks = 0;
      let rightLinks = 0;
      for (let i = 0; i < myProcData.length; i++) {
        fetch(myProcData[i].link).then(response => {
          if (response.status == 200) {
            rightLinks++;
          } else if (response.status == 404 || response.status == 400) {
            wrongLinks++;
          } else {
            console.log('error', response.status);
          }
          if (wrongLinks + rightLinks === myProcData.length) {
            console.log(`File: ${filePath} has:`);
            console.log(`✔ Total Links: ${myProcData.length}`);
            console.log(`✔ Total Unique Links: ${rightLinks}`);
            console.log(`✖ Total Broken links: ${wrongLinks}\n`);
          }
        });
      }
    });
  });
}

const validateAndStats = (filePath)  =>{
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log('Found links:');
      myProcData = getLinks(filePath, data);
      let wrongLinks = 0;
      let rightLinks = 0;
      // console.log(myProcData);
      for (let i = 0; i < myProcData.length; i++) {
        fetch(myProcData[i].link).then(response => {
          if (response.status == 200) {
            rightLinks++;
            console.log(
              `File: ${filePath}\n Text:${myProcData[i].text}\n Link: ${
                myProcData[0].link
              }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          } else if (response.status == 404 || response.status == 400) {
            wrongLinks++;
            console.log(
              `File: ${filePath}\n Text:${myProcData[i].text}\n Link: ${
                myProcData[0].link
              }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          } else {
            console.log('error', response.status);
          }
          if (wrongLinks + rightLinks === myProcData.length) {
            console.log(`File: ${filePath} has:`);
            console.log(`✔ Total Links: ${myProcData.length}`);
            console.log(`✔ Total Unique Links: ${rightLinks}`);
            console.log(`✖ Total Broken links: ${wrongLinks}\n`);
          }
        });
      }
    });
  });
}

//options
const menuOptions = () => {
  if (options === '--validate') {
    console.log(readPathStatus(filePath));
  } else if (options === '--stats') {
    console.log(functionStats(filePath));
  } else if (options === '--validate--stats') {
    console.log(validateAndStats(filePath));
  }
};
menuOptions();

module.exports = {
  readPathStatus,
  menuOptions,
  validateFileMd,
  // pathIsAbsolute,
  getLinks,
  validateAndStats,
  functionStats,
  readCompletePath,
  directoryOrFile,
};
