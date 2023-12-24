import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // useHistory を useNavigate に変更
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../../pages/Authentication";
import { signIn } from "../../lib/api/auth";
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
  box: {
    marginTop: "2rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/authentication/success");

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
            <CardHeader className={classes.header} title="サインイン" />
            <CardContent>
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
                placeholder="6文字以上で入力してください"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={!email || !password ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                OK
              </Button>
              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  アカウントを持ってない方はこちらから &nbsp;
                  <Link to="/authentication/signup" className={classes.link}>
                    今すぐ登録
                  </Link>
                </Typography>
              </Box>
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

export default SignIn;
