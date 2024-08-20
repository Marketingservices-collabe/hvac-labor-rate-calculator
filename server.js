const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/calculate-hourly-rate', (req, res) => {
    try {
        const { hourlySalary, directCosts, indirectCosts, desiredProfit } = req.body;

        if (hourlySalary === undefined || directCosts === undefined || indirectCosts === undefined || desiredProfit === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Calculate the hourly rate
        const hourlyRate = hourlySalary + directCosts + indirectCosts + desiredProfit;

        res.json({
            hourlyRate: hourlyRate.toFixed(2),
            breakdown: {
                hourlySalary,
                directCosts,
                indirectCosts,
                desiredProfit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
