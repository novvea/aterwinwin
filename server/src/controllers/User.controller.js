import UserModel from '../models/User.model.js'

const createUser = async (request, response) => {
  const user = new UserModel({
    username: request.body.username,//ska peka på den data som skickas från servern
    password: request.body.password,
    /*     age: request.body.age */
  })
  try {
    const databaseResponse = await user.save()
    response.status(201).send(databaseResponse) //vi skickar tillbaka ett svar från servern, i detta fall att anropet gick som planerat
  } catch (error) {
    response.status(500).send({ //internal server error, servern lyckades inte handskas med det du ville, men vi nådde fram till servern
      message: 'Errro while trying to create user',
      stack: error
    })
  }
}

const getAllUsers = async (request, response) => {
  try {
    const databaseResponse = await UserModel.find()
    response.status(200).send(databaseResponse) //200=anropet gick som planerat
  } catch (error) {
    response.status(500).send({ message: error.message }) //vill ej ha i produktion
  }
}

const getUserById = async (request, response) => {
  try {
    const userId = request.params.userId
    const databaseResponse = await UserModel.findById(userId)
    response.status(200).send(databaseResponse)
  } catch (error) {
    response.status(500).send({
      message: `Error while trying to delete user with ID ${userId}`
    })

  }
}

const deleteUser = async (request, response) => {
  try {
    const userId = request.params.userId
    const databaseResponse = await UserModel.findByIdAndDelete(userId)//ska hitta en användare baserat på ida och sedan deleta
    response.status(200).send({ message: 'Successfully deleted urser', data: databaseResponse })
  } catch (error) {
    response.status(500).send({
      message: `Error while trying to delete user with ID ${userId}`
    })
  }
}

const updateUser = async (request, response) => {
  const userId = request.params.userId
  const data = {
    username: request.body.username,
    password: request.body.password
  }
  try {
    const databaseResponse = await UserModel.findByIdAndUpdate(userId, data, { new: true })//vilket id vill vi ändra daya på, hur ser datan ut, retunerar nya datan
    response.status(200).send(databaseResponse)
  } catch (error) {
    response.status(500).send({
      message: `Error while trying to update user with ID ${userId}`,
      error: error.message
    })

  }
}

const searchUsername = async (request, response) => {//söka efter användare
  try {
    const databaseResponse = await UserModel.find({ username: request.query.username })//kan söka med ? i urlen
    response.status(200).send(databaseResponse)
  } catch (error) {
    response.status(500).send({
      message: `Error occured while trying to retrieve user with username: ${request.query.username}`,
      error: error.message
    })
  }
}
export default {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  searchUsername
}