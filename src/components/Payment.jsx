import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function Payment() {

    const [contact, setContact] = useState('');
    const [amount, setAmount] = useState(0)

    const handlePayment = async () => {
        const paymentData = {
          contact: contact,
          amount: amount,
        };
    
        try {
          const response = await fetch('http://localhost:3000/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });
    
          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleChange = (event) => {
      setContact(event.target.value);
    };

    return (
        <div className='flex flex-col justify-between items-center w-1/2 h-5/6 bg-white rounded-2xl shadow-xl px-8 pt-8 pb-12 gap-2'>
            <h1 className='font-bold text-xl'>Send Money</h1>
            <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Contact</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select"
                value={contact}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>Jane Doe</MenuItem>
                <MenuItem value={20}>John Smith</MenuItem>
                </Select>
            </FormControl>
            <TextField id="standard-basic" label="Amount (CAD)" variant="standard" fullWidth/>
            <button className='px-6 py-2 bg-green-500 text-white font-bold rounded-xl text-xl'>Send</button>
        </div>
    )
}

export default Payment