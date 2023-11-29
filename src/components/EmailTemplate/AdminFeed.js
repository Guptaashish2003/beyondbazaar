export default ({ name, email, phone, message }) => {
  const sendEmail = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            perspective: 800px;
        }

        .container {
            width: 80%;
            margin: 20px auto;
           
        }

        h2 {
            background-color: #e9e9e9;
            color: #000000;
            padding: 20px;
            margin: 0;
            
        }

        table {
            width: 100%;
            background-color: #fff;
            border-collapse: collapse;
            
        }

        td {
            padding: 10px;
            border: 1px solid #ddd;
        }

        strong {
            color: #171818;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Contact Form Submission</h2>

        <table>
            <tr>
                <td><strong>Name:</strong></td>
                <td>${name}</td>
            </tr>
            <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${phone}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${email}</td>
            </tr>
            <tr>
                <td><strong>Message:</strong></td>
                <td>${message}</td>
            </tr>
        </table>
    </div>

</body>
</html>

    `;
  return sendEmail;
};
