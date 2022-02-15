const path = require('path')
const fs = require('fs')
// const fs = require('fs').promises

// fs.mkdir(path.join(__dirname, 'main','online'),{recursive: true}, (err) =>{
//   if (err) {
//     console.log(err)
//   }
// })
//
// fs.mkdir(path.join(__dirname, 'main','inPerson'),{recursive: true}, (err) =>{
//   if (err) {
//     console.log(err)
//   }
// })

const onlineUsers = [
  { name: "Andrii", age: 22, city: "Lviv" },
  { name: "Alindos", age: 19, city: "Romny" },
  { name: "Maksym", age: 32, city: "London" },
  { name: "Ann", age: 15, city: "Kyiv" },
  { name: "Oleg", age: 62, city: "Lviv" },
];
const inPersonUsers = [
  { name: "Andrii", age: 23, city: "Lviv" },
  { name: "Kate", age: 45, city: "Lviv" },
  { name: "Viktor", age: 21, city: "London" },
  { name: "Mike", age: 11, city: "Kyiv" },
  { name: "Olga", age: 22, city: "Lviv" },
];
onlineUsers.map(value => {
  fs.writeFile(path.join(__dirname, 'main', 'online', `${value.name}.txt`), JSON.stringify(value), (e) => {
    if (e) return e
  })
})

inPersonUsers.map(value => {
  fs.writeFile(path.join(__dirname, 'main', 'inPerson', `${value.name}.txt`), JSON.stringify(value), (e) => {
    if (e) return e
  })
})

fs.readdir(path.join(__dirname, 'main', 'inPerson'), (err, data) => {
  data.map(value => {
    if (!value.includes('moved_')) {
      fs.rename(path.join(__dirname, 'main', 'inPerson', value), path.join(__dirname, 'main', 'online', `moved_${value}`), (err => {
        if (err) return err
      }))
    }
  })
  if (err) return err;
})

fs.readdir(path.join(__dirname, 'main', 'online'), (err, data) => {
  data.map(value => {
    if (!value.includes('moved_')) {
      fs.rename(path.join(__dirname, 'main', 'online', value), path.join(__dirname, 'main', 'inPerson', `moved_${value}`), (err => {
        if (err) return err;
      }));
    }
  });
});

// fs.rename(path.join(__dirname, 'inPerson', 'inPersonUsers'))

// const async = async () => {
//   await fs.mkdir(path.join(__dirname, 'main'))
// }
//
// async()
