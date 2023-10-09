import React, { useState, FormEvent } from 'react';

type QuestionnaireProps = {
  onPageChange: (page: "game" | "about" | "settings" | "questionnaire") => void;
};

const Questionnaire: React.FC<QuestionnaireProps> = ({ onPageChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedOption) {
      try {
        const response = await fetch('http://localhost:3001/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: selectedOption }),
        });

        if (response.ok) {
          console.log('Answer saved successfully');
		  onPageChange('game');
        } else {
          console.error('Failed to save answer');
        }
      } catch (error) {
        console.error('Network error', error);
      }
    } else {
      console.error('No option selected');
    }
  };

  return (
    <div className="App-questionnaire">
      <p>Hei!
	  <br /> 
	  Kartoitamme Kielurin k&auml;ytt&ouml;astetta.<br />
	  Pelaatko Kieluria</p>
      <form onSubmit={handleSubmit}>
        {['Päivittäin', 'Viikoittain', 'Kuukausittain', 'Harvemmin'].map(option => (
          <button
            key={option}
            type="button"
            onClick={() => handleOptionClick(option)}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
		<br /><br />
        <button type="submit">L&auml;het&auml; vastaus</button>
      </form>
	  <p>Kiitos paljon!</p>
    </div>
  );
};

export default Questionnaire;
