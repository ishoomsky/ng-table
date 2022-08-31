const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

class Storage {
  constructor() {
    this.headers = [];
    this.data = [];
  }
  initData() {
    const length = 200;
    const firstNames = [
      'Wade',
      'Dave',
      'Seth',
      'Ivan',
      'Riley',
      'Gilbert',
      'Jorge',
      'Dan',
      'Brian',
      'Roberto',
      'Ramon',
      'Miles',
      'Liam',
      'Nathaniel',
      'Ethan',
      'Lewis',
      'Milton',
      'Claude',
      'Joshua',
      'Glen',
      'Harvey',
      'Blake',
      'Antonio',
      'Connor',
      'Julian',
      'Harold',
      'Aidan',
    ];
    const lastNames = [
      'Adams',
      'Baker',
      'Clark',
      'Davis',
      'Evans',
      'Frank',
      'Ghosh',
      'Hills',
      'Irwin',
      'Jones',
      'Klein',
      'Lopez',
      'Mason',
      'Nalty',
      'Ochoa',
      'Patel',
      'Quinn',
      'Reily',
      'Smith',
      'Trott',
      'Usman',
      'Valdo',
      'White',
      'Xiang',
      'Yakub',
      'Zafar',
    ];
    const professions = [
      'Banking Management',
      'Foreign Exchange Management',
      'Asset Management',
      'Mutual Fund Management',
      'Finance Management',
      'Investment Analysis Management',
      'Risk and Insurance Management',
      'Taxation Management',
      'Investment Management',
      'International Finance Management',
      'Takeover and Acquisition Management',
      'Corporate and Finance Management',
      'Equity Research Management',
      'Treasury Management',
      'Audit Management',
      'Chartered Finance Management',
      'Cost and Management Accounting',
      'Market Risk Management',
      'Equality Research Management',
      'Stock Management',
      'Personal Finance Management',
      'Corporate Social Responsibility',
      'Software Project Management',
      'SAP Consultancy Management',
      'Software Management',
      'Information Technology',
      'E-Business System',
      'Cyber Law Management',
      'Hardware Management',
      'E-commerce',
      'Networking Management',
      'Purchasing Management',
      'Data Management',
    ]
    const minAge = 18;
    const maxAge = 65;
    const picsumImagesIds = [
      237,
      433,
      577,
      582,
      593,
      659,
      718,
      783,
      790,
      837,
      1024,
      1025,
      1074,
      1084
    ];

    this.headers = ['#', 'Image', 'Name', 'Profession', 'Age'];
    this.data = Array.from(Array(length), (item, index) => {
      return {
        id: index,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        imageUrl: 'https://picsum.photos/id/' + picsumImagesIds[Math.floor(Math.random() * picsumImagesIds.length)] + '/60/60',
        profession: professions[Math.floor(Math.random()* professions.length)],
        age: Math.round(minAge - 0.5 + Math.random() * (maxAge - minAge + 1)),
      };
    });
  }
  addPerson(person) {
    if (typeof person === 'object' && person !== null) {
      const newPerson = {
        ...person,
        id: Math.floor(this.data.length + Math.random() * (999 - this.data.length))
      }
      this.data.unshift(newPerson);
      return newPerson;
    } else {
      return false;
    }
  }

  getPersons() {
    return {
      data: this.data,
      headers: this.headers,
    };
  }

  getPersonById(_personId) {
    let personId = Number(_personId);
    const index = this.data.findIndex((person) => person.id === personId);
    return index !== -1;
  }

  updatePersonById(_personId, newData){
    let personId = Number(_personId);
    const index = this.data.findIndex((person) => person.id === personId);
    if (index === -1) {
      return false;
    }
    this.data[index] = {
      ...this.data[index],
      ...newData
    };
    return true;
  }

  deletePersonById(_personId) {
    let personId = Number(_personId);
    const index = this.data.findIndex((person) => person.id === personId);
    if (index === -1) {
      return false;
    } else {
      this.data.splice(index, 1);
      return true;
    }
  }
}

app.use(cors());

let storage = new Storage();
storage.initData();

app.get("/getPersons", (req, res) => {
  res.send(storage.getPersons());
});

app.get("/getPerson/:id", (req, res) => {
  const result = storage.getPersonById(req.params.id);
  if (typeof result === 'number') {
    res.send(result);
  } else {
    res.status(500).json({message: "Person with such id doesn't exist"});
  }
});

app.post("/addPerson", (req, res) => {
  const result = storage.addPerson(req.body);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({message: 'Wrong person payload'});
  }
});

app.patch("/editPerson/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = storage.updatePersonById(id, updatedData)
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({message: 'Person with such id doesn\'t exist: ' + id});
  }
});

app.delete("/deletePerson/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = storage.deletePersonById(id);
  if (result) {
    res.status(200).json({deletedPerson: id});
  } else {
    res.status(400).json({message: 'Person with such id doesn\'t exist'})
  }
})

app.listen(3005, () => {
  console.log("Server listening on port 3005.");
});
