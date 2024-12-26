import React from 'react';

const Tips = ({ title, list }) => {
  return (
    <div className="tip">
      <span>🙆‍♀️</span>
      <div>
        {title}
        <br />
        {list && list.length > 0 && (
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tips;
