import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import { Jumbotron, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import logo_white from '../logo_white.png'
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
    BrowserRouter as Router,
    NavLink
  } from "react-router-dom";
  var firebase = require('firebase');




class NavigationBar extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:false,
            username:"",
            popoverOpen:false,
            businessExists: false
        }   
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({username:user.email, loggedIn:true})
              // User is signed in.
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    togglePopover(){
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    signOut(){
        firebase.auth().signOut().then(()=> {
            // Sign-out successful.
            this.setState({loggedIn:false})
          }).catch(function(error) {
            // An error happened.
          });
    }

    renderViewOrCreateBusiness(){
        if(this.state.businessExists){
            return (<div>
                <NavLink className="burger-menu-item" to="/business">BUSINESS NAME</NavLink>
            </div>)
        }else{
            return (<div>
                <NavLink className="burger-menu-item" to="/business/create">+ Add Business</NavLink>
            </div>)
        }
    }

    renderProfileOrLogin(){
        if(this.state.loggedIn){
            return (<div>
                <Button color="danger" onClick={this.signOut.bind(this)}>Sign Out</Button>
            </div>)
        }else{
            return 

        }
    }

    render(){
        return(
            <div className="navigation-bar-container">
                <Menu>
                    
                    <NavLink className="burger-menu-item" to="/home">Home</NavLink>
                    <NavLink className="burger-menu-item" to="/profile">Profile</NavLink>
                    <NavLink className="burger-menu-item" to="/">About Us</NavLink>
                    {this.renderViewOrCreateBusiness()}
                    {this.renderProfileOrLogin()}
                </Menu>
            </div>
            
        )
    }
}

export default NavigationBar;