import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './Context/AuthContext';
import LogIn from './Components/LogIn/LogIn';
import CreateOreder from './Components/CreateOrder/CreateOrder';
import OrderContextProvider from './Context/OrderContext';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import PublicRoutes from './Components/PublicRoutes/PublicRoutes';
import FollowUp from './Components/FollowUp/FollowUp';
import Board from './Components/Board/Board';

function App() {
    return(
        <div className = 'App' >
            <AuthContextProvider>
                <OrderContextProvider>
                    <BrowserRouter>
                        <NavBar />
                        <Routes>

                            <Route>
                                <Route element = {<PublicRoutes />} >
                                    <Route path = '/follow-up' element = {<FollowUp/>} />
                                    <Route path = '/login' element = {<LogIn/>}/>
                                </Route>
                            </Route>

                            <Route>
                                <Route element = {<PrivateRoutes />} >
                                    <Route path = '/create-order' element = {<CreateOreder/>}/>
                                    <Route path = '/' />
                                    <Route path = '/board' element = {<Board/>}/>
                                </Route>
                            </Route>

                        </Routes>
                    </BrowserRouter>
                </OrderContextProvider>
            </AuthContextProvider>
            
        </div>
    );
}

export default App;
