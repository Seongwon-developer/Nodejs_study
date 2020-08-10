import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';

const customer={
  'id' : 1,
  'name':'양성원',
  'birthday' : '991106',
  'gender' : '남성',
  'job' : '대학생'
}

class App extends Component{
  render(){
    return(
      <Customer
      id={customer.id}
      name={customer.name}
      birthday={customer.birthday}
      gender={customer.gender}
      job={customer.job}
      />
    );
  };
}

export default App;