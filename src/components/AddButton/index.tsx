import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';
import plusImage from '../../assets/plus.png';
import { FaSquarePlus } from 'react-icons/fa6';

const AddButton = () => {
  return (
    <Link to="/write">
      <S.Button>
        <FaSquarePlus style={{ width: '3.5rem', height: '3.5rem' }} />
        {/* <img src={plusImage} alt="" /> */}
      </S.Button>
    </Link>
  );
};

export default AddButton;
