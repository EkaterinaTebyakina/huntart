import Header from "../../widgets/header/ui/Header";
import RegisterForm from "../../widgets/registerForm/ui/RegisterForm";

const RegisterPage = () => {

  return (
    <>
      <header className="header">
        <Header menuLinks={[{url:"/", name:"Главная"}, {url:"/authorization", name:"Авторизация"}]}/>
      </header>
      <main className="main">
        <RegisterForm/>
      </main>
    </>
  )
}

export default RegisterPage;