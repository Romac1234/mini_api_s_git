import express, { Router } from "express";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const router = Router();

const app = express();
app.use(bodyParser.json());

let contacts = [
  {
    id: "1",
    name: "Jim Bim",
    email: "jim@example.com",
    phone: "123-333-343",
    address: "123 Main St",
  },
  {
    id: "2",
    name: "Jack Daniels",
    email: "jack@example.com",
    phone: "123-333-343",
    address: "123 Main St",
  },
  {
    id: "3",
    name: "Rum Bum",
    email: "rum@example.com",
    phone: "123-333-343",
    address: "123 Main St",
  },
];

router.get("/contacts", (req, res) => {
  // res.json({ contacts:contacts }); // obe jsou stejne tak to mutz zkratit
  res.json(contacts);
});

router.get("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    res.status(400).json({ message: "Contact not found!" });
  }
  // res.json({ contact });
  res.json(contact);
});

router.post("/contacts", (req, res) => {
  // let name = req.body.name; // moh byt to udělat postupně ale lepší je to najednou níže
  let { id, name, email, phone, address } = req.body;
  let newContact = {
    id,
    name,
    email,
    phone,
    address,
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

router.put("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let { name, email, phone, address } = req.body;
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index == -1) {
    return res.status(400).json({ message: "Contact not found!" });
  }
  contacts[index] = { id, name, email, phone, address };
  res.json(contacts[index]);
});

router.delete("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index == -1) {
    return res.status(400).json({ message: "Contact not found!" });
  }
  const deletedContact = contacts.splice(index, 1);
  res.json(deletedContact);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

app.use("/api/", router);
export const handler = serverless(app);
