import React, { Component,State } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from "@material-ui/core/styles";
const ChatAppPage=()=> {

 let state = {
    messages: [],
    value: '',
    name: '',
    room: 'vacad',
  }


    return (
    <div>
        This should display a chat app
     </div>
  )
}
export default ChatAppPage