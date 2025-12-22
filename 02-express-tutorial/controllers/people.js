const {people} = require("../data.js")

const getPeople  = (req,res)=>{
    res.status(200).json({ success: true, data: people });
}

const addPerson = (req,res)=>{
    const {name} = req.body; 

    if(!name){
        return res.status(400).json({ success: false, 
        message: "Please provide a name" });
    }

    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });

}

const getPerson = (req, res)=>{
    const { id } = req.params;
    const person = people.find((p)=>p.id==Number(id));

    if(!person){
         return res.status(404).json({
            success: false,
            message: `No person with id ${id}`,
        });
    }
    res.status(200).json({ success: true, data: person });
}

const updatePerson = (req, res) => {
  const { id } = req.params;;
  const { name } = req.body;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
  }

  person.name = name;
  res.status(200).json({ success: true, data: person });
};

const deletePerson = (req, res)=>{
    const id = Number(req.param.id);
    const person = people.find((p)=>p.id==id);

    if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
    }

    const newPeople = people.filter((p) => p.id !== id);
    return res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
  getPeople,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson,
};