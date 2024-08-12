import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#444',
    },
    secondary: {
      main: '#444',
    },
  },
});

const EditTask = () => {
  const [partyName, setPartyName] = useState('');
  const [partyLeader, setPartyLeader] = useState('');
  const [partySymbol, setPartySymbol] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnrollParty = async () => {
    try {
      const response = await fetch('https://vs-backend-fh1x.onrender.com/enroll-party', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partyName: partyName.toLowerCase(),
          partyLeader: partyLeader.toLowerCase(), 
          partySymbol: partySymbol.toLowerCase(), 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        setErrorMessage('');
        setPartyName('');
        setPartyLeader('');
        setPartySymbol('');
      } else {
        const data = await response.json();
        if (response.status === 409) {
          setErrorMessage(data.message);
        } else {
          console.error('Failed to enroll party:', response.statusText);
          setErrorMessage('Failed to enroll party. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error enrolling party:', error);
      setErrorMessage('Error enrolling party. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}>
          Enroll Party
        </Typography>
        <TextField
          label="Party Name"
          variant="outlined"
          fullWidth
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Party Leader"
          variant="outlined"
          fullWidth
          value={partyLeader}
          onChange={(e) => setPartyLeader(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Party Symbol"
          variant="outlined"
          fullWidth
          value={partySymbol}
          onChange={(e) => setPartySymbol(e.target.value)}
          margin="normal"
          required
        />
        {errorMessage && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleEnrollParty}>
            Enroll Party
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditTask;
