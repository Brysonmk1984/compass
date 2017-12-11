import React from 'react';

export default function Title(props) {
  return (
    <div>
      <h3>
        <img src={props.selectedPerson.profileUrl} /> {props.selectedPerson.firstName} {props.selectedPerson.lastName}
      </h3>
    </div>
  );
}
