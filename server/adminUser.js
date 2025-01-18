import bcrypt from "bcryptjs"; // Import bcryptjs
import User from "./schema/user.schema.js"; // Import the User schema

const createAdminUser = async () => {
  try {
    // Check if the admin user already exists
    const existingUser = await User.findOne({ username: "admin" });
    if (existingUser) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("password@123", 10);

    // Create the admin user
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

export default createAdminUser;
