import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import Icon from './Icon'
import useStyles from './styles'
import { useHistory } from 'react-router-dom'

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const switchMode = () => {
        handleShowPassword(false)
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }
    const GoogleSuccess = async (res) => {
        // console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenId

        try {
            dispatch(
                {
                    type: 'AUTH',
                    data: { result, token }
                }
            )
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const GoogleFailure = (error) => {
        console.log('Failure')
        console.error(error)
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='firstName' label='First Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' half handleChange={handleChange} type='password' /> }
                        </Grid>

                        <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                            {isSignup ? 'Sign Up': 'Sign in'}
                        </Button>
                        <GoogleLogin 
                            clientId="958743914847-mireuk24bqh00e3nbvfa33eqb8l6cb19.apps.googleusercontent.com" 
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />} 
                                    variant='contained'
                                >Google Sign In</Button>
                            )}
                            onSuccess={GoogleSuccess}
                            onFailure={GoogleFailure}
                            cookiePolicy='single_host_origin'
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
