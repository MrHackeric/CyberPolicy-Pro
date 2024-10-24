import {
  createUser,
  getUserByEmail,
  getUsers,
  deleteUserById,
  getUserById,
} from "../models/users.js";
import {
  random,
  genSalt,
  hashPassword,
  auth,
  validatePassword,
} from "../utils/helpers.js";

const CYBER_SECRET = process.env.CYBERPOLICY_PRO_SECRET;

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, profilePicture, role, password } =
    req.body;

  try {
    //validate the inputs
    if (
      !fullName &&
      !email &&
      !phoneNumber &&
      !profilePicture &&
      !role &&
      !password
    ) {
      return res.status(400).json({ msg: "Input the all required details" });
    }
    // Check if user already exists
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User already exists proceed to login" });
    }

    // Hash password
    const salt = await genSalt();

    const hashedPassword = await hashPassword(password, salt);

    // Create new user
    const newUser = await createUser({
      fullName,
      email,
      phoneNumber,
      profilePicture,
      role,
      password,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });
    console.log("User created succesfully", newUser);
    res.status(200).json({ user: newUser }).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await validatePassword(
      password,
      user.authentication.password
    );
    if (!isMatch) {
      return res.status(403).json({ msg: "Invalid Credentials" });
    }

    const salt = random();
    user.authentication.sessionToken = auth(salt, user._id.toString());
    await user.save();

    //response with cookie
    res.cookie(CYBER_SECRET, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      maxAge: 360000,
      httpOnly: true,
    });
    return res.status(200).json(user).end;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/logout
// @access  Public

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObj) => tokenObj.token !== req.token
    );
    await req.user.save();
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to logout" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private


// @desc    Update user profile
// @route   PUT /api/users/update/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;
    if (!fullName) {
      res.status(400);
    }
    const user = await getUserById(id);
    user.fullName = fullName;
    await user.save();

    res.status(200).json({ msg: "User updated succcesfully.", user });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    res.status(403);
  }
};
