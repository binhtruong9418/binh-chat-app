import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import { Col, Row } from 'antd'
import AuthProvider from './Context/AuthProvider';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const WrappedStyled = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #FBC5C5;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

function App() {
  return (
    <Row>
        <Col span={24}>
          <WrappedStyled>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                    <Route path='login' element={ <Login /> }/>
                    <Route path='/' element={ <ChatWindow /> }/>
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </WrappedStyled>
        </Col>
    </Row>
  );
}

export default App;
