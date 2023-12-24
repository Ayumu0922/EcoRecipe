import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import Cookies from "js-cookie";
import { AuthContext } from "../../pages/Authentication";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { signUp } from "../../lib/api/auth";
import AlertMessage from "../utils/AlertMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    display: "flex", // flexboxコンテナを使う
    flexDirection: "column", // 子要素を縦方向に並べる
    alignItems: "center", // 子要素を水平方向に中央に配置
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Updated hook for navigation

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/authentication/signin"); // Use the navigate function to redirect
        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="サインアップ" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="ユーザ名"
                value={name}
                margin="dense"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="メールアドレス"
                value={email}
                margin="dense"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワード"
                type="password"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワードをもう一度入力してください"
                type="password"
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={
                  !name || !email || !password || !passwordConfirmation
                    ? true
                    : false
                }
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                OK
              </Button>
            </CardContent>
          </Card>
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="エラー"
          message="メールアドレスかパスワードが間違っています！"
        />
      </div>
    </>
  );
};

export default SignUp;
