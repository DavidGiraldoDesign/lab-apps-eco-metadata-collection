import { fs } from "../dependencies.js";

export const postUserData = (req, res) => {
  try {
    // read existing data from users.json file
    const data = fs.readFileSync('./localCollection/users.json');
    const jsonData = JSON.parse(data);

    // create new user object from request body
    const newUser = {
      id: jsonData.users.length + 1,   // generate new user ID
      name: req.body.name,
      email: req.body.email,
      dob:req.body.dob,
      phone:req.body.phone,
      privacyAgreement: req.body.privacyAgreement
    };

    // add new user to existing data
    jsonData.users.push(newUser);

    // write updated data back to users.json file
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonData, null, 2));

    // send response indicating successful creation of new user
    res.status(201).send({ msn: `User ${newUser.id} created` });
  } catch (error) {
    // handle any errors that occur
    console.error(error);
    res.status(500).send('Error adding user');
  }
}

export const getUsers = (req, res) => {
  res.send({ mns: 'Hello!' });
}