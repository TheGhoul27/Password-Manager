/* eslint-disable no-undef */
/* Access-Control-Allow-Origin */
var xmlrpc = require('xmlrpc');

function addUser(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/'});
  return new Promise(function (resolve, reject) {
    return client.methodCall('addUser', params, function (error, value) {
      var res
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
        }
      }
      if (error === null) {
        if (res) {
          console.log('User Added!!');
          return resolve('User Added!!');
        }
        else {
          console.log('User Already Exists!!');
          return resolve('User Already Exists!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  });
}


function userValidation(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('userValidation', params, function (error, value) {
      var res
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
        }
      }
      if (error === null) {
        if (res) {
          console.log('User Found!!');
          return resolve('User Found!!');
        }
        else {
          console.log('User Not Found!!');
          return resolve('User Not Found!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  }
  );
}

function addCreate(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('addCreate', params, function (error, value) {
      var res
      var val
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
          val = JSON.parse(value[key].toString()).values
        }
      }
      if (error === null) {
        if (res) {
          console.log('Credentails Added!!');
          return resolve(val);
        }
        else {
          console.log('Credentails Present!!');
          return resolve('Credentails Present!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  }
  );
}

function update(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('update', params, function (error, value) {
      var res
      var val
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
          val = JSON.parse(value[key].toString()).values
        }
      }
      if (error === null) {
        if (res) {
          console.log('Operation Done!!');
          return resolve(val);
        }
        else {
          console.log('Operation Aborted!!');
          return resolve('Operation Aborted!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  }
  );
}

function deletePass(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('delete', params, function (error, value) {
      var res
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
        }
      }
      if (error === null) {
        if (res) {
          console.log('Operation Done!!');
          return resolve('Operation Done!!');
        }
        else {
          console.log('Operation Aborted!!');
          return resolve('Operation Aborted!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  }
  );
}

function forgotPassword(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('forgotPassword', params, function (error, value) {
      if (error === null) {
        if (value === true) {
          console.log('Password Sent!!');
          return resolve('Password Sent!!');
        }
        else {
          console.log('User Not Found!!');
          return resolve('User Not Found!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  }
  );
}

function get(params) {
  var client = xmlrpc.createClient({ host: 'localhost', port: 5050, path: '/' });
  return new Promise(function (resolve, reject) {
    return client.methodCall('get', params, function (error, value) {
      var res
      for (const key in value) {
        if (key === 'response') {
          res = JSON.parse(value[key].toString()).returnvalue
        }
      }
      if (error === null) {
        if (res) {
          console.log('Password Found!!');
          return resolve(res);
        }
        else {
          console.log('Password Not Found!!');
          return resolve('Password Not Found!!');
        }
      }
      else {
        console.log('Error while doing the Operation!!');
        return reject(error);
      }
    });
  });
}


module.exports = { addUser, userValidation, addCreate, update, deletePass, forgotPassword, get};

// Website to make one big function to access all the functions: https://getstream.io/blog/javascript-promises-and-why-async-await-wins-the-battle/ 