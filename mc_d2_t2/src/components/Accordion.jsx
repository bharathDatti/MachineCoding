import React, { useState, useEffect } from 'react';

// Accordion component
const Accordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    // Fetching the mock data from the faqs.json file
    fetch('https://dummyjson.com/comments')
      .then((response) => response.json())
      .then((data) => setFaqs(data.comments));
  }, []);

  const handleClick = (id) => {
    // Toggle the accordion content visibility
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="accordion">
      {faqs.map((faq) => (
        <div key={faq.id} className="faq-item">
          <div className="faq-question" onClick={() => handleClick(faq.id)}>
            {openId === faq.id ? '-' : '+'} {faq.user.username}
          </div>
          {openId === faq.id && (
            <div className="faq-answer">
              <p><strong>{faq.user.fullName}</strong></p>
              <p>{faq.body}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
