const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //helps with the encryption

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  following: [{ type: Schema.Types.ObjectId, ref: "user" }] //so a user can follow other users
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}; //so the password isnt being stored as a plain text bc its insecure so we store a hashesd version of it 

UserSchema.methods.validPassword = async function(candidatePassword) {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
}; // compare input password to the password stored 

module.exports = mongoose.model("user", UserSchema);