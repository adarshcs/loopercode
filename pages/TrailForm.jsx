import { useState } from 'react';

export default function TrailForm({ onClose }) {
    const [formData, setFormData] = useState({
        trailName: '',
        latitude: '',
        longitude: '',
        trailType: 'green',
        url: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.trailName || !formData.latitude || !formData.longitude || !formData.url) {
            alert('Please fill in all mandatory fields.');
            return;
        }

        // Send data to the API to send the WhatsApp message
        try {
            const response = await fetch('/api/sendWhatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Form submitted and WhatsApp message sent!');
            } else {
                alert('Failed to send message: ' + (data.error || 'Unknown error'));
            }

            onClose(); // Close the modal after submission
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        }
        onClose();
    };

    return (
        <div style={{ position: 'relative', padding: '20px', textAlign: 'left' }}>
            

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ flex: '1' }}>
            Trail Name:
        </label>
        <input 
            name="trailName" 
            value={formData.trailName} 
            onChange={handleChange} 
            required 
            style={{ flex: '2' }}
        />
    </div>
    
    <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ flex: '1' }}>
            Latitude:
        </label>
        <input 
            name="latitude" 
            type="number" 
            value={formData.latitude} 
            onChange={handleChange} 
            required 
            style={{ flex: '2' }}
        />
    </div>
    
    <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ flex: '1' }}>
            Longitude:
        </label>
        <input 
            name="longitude" 
            type="number" 
            value={formData.longitude} 
            onChange={handleChange} 
            required 
            style={{ flex: '2' }}
        />
    </div>
    
    <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ flex: '1' }}>
            Trail Type:
        </label>
        <select 
            name="trailType" 
            value={formData.trailType} 
            onChange={handleChange} 
            style={{ flex: '2' }}
        >
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
        </select>
    </div>
    
    <div style={{ display: 'flex', gap: '10px' }}>
        <label style={{ flex: '1' }}>
            URL:
        </label>
        <input 
            name="url" 
            type="url" 
            value={formData.url} 
            onChange={handleChange} 
            required 
            style={{ flex: '2' }}
        />
    </div>
    

    <button 
        type="submit" 
        style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }}
    >
        Submit
    </button>
</form>

        </div>
    );
}
