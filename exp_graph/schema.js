module.exports = `
  type Query {
    empget:[user],
    empName(name:String!):[user]
  },
  type user{
  	Name:String
    Phone:String
  },
  mutation setName {
  setName(name: "Zuck") {
    newName
  }
}
`;