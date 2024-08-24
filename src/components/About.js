import React from 'react';

const About = () => {
  return (
    <div className="about-section">
      <h1>About iNotebook</h1>
      <p>
        Welcome to <strong>iNotebook</strong>, a powerful and intuitive note-making application designed to help you efficiently create, edit, and organize your notes. Whether you’re a student, professional, or someone who loves jotting down ideas, iNotebook offers a seamless and secure experience for managing all your notes in one place.
      </p>
      
      <h2>Key Features:</h2>
      <ul>
        <li>
          <strong>User-Friendly Interface:</strong> Our clean and straightforward design ensures that you can focus on what matters most—your notes. Easily navigate through different sections and find what you need with minimal effort.
        </li>
        <li>
          <strong>Efficient Note Management:</strong> Create, edit, and delete notes with ease. Our app supports CRUD (Create, Read, Update, Delete) operations, allowing you to manage your notes in an organized and hassle-free manner.
        </li>
        <li>
          <strong>Secure and Private:</strong> Your privacy is our priority. iNotebook uses JWT authentication to ensure that your notes are secure and accessible only to you.
        </li>
        <li>
          <strong>Cross-Platform Compatibility:</strong> Access your notes anytime, anywhere. Whether you're on your computer, tablet, or smartphone, iNotebook is designed to work seamlessly across all devices.
        </li>
      </ul>

      <h2>Why Choose iNotebook?</h2>
      <p>
        iNotebook is built using the robust MERN stack (MongoDB, Express.js, React, Node.js), ensuring a fast and reliable experience. We believe in providing a tool that enhances productivity while maintaining simplicity and security.
      </p>
      <p>Join us on your note-taking journey and experience the difference with iNotebook!</p>
    </div>
  );
};

export default About;

