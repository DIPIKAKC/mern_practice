// define gareko bahek api hit garyo bhane error falcha
export const notAllowed = (req, res) => {
  res.status(405).json({
    status: 'fail',
    message: 'Method not allowed',
  });
};
