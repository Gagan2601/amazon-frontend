import React from 'react';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import './Language.css';

function LanguageDropdown() {
  return (
    <div className='language'>
        <img width="24" height="24" src="https://img.icons8.com/color/24/india.png" alt="india"/>
    <div className="language_title">
    EN
        <Icon className="language_arrow" path={mdiMenuDown} size={0.8} />
    </div>
    </div>
  );
}

export default LanguageDropdown;