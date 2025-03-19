import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import styles from "./DynamicForm.module.css";
import { useState } from "react";

export default function DynamicForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const username = watch("username");

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h3 className={styles.title}>Введите данные</h3>

      <div className={styles.inputContainer}>
        <TextField
          className={styles.input}
          label="Username"
          variant="outlined"
          id="username"
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Имя обязательно",
            minLength: { value: 5, message: "Минимум 5 символов" },
          })}
        />
        {errors.username && (
          <p className={styles.errorMessage}>{errors.username.message}</p>
        )}
      </div>

      {username && username.length >= 5 && (
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            {...register("password", {
              required: "Пароль обязателен",
              pattern: {
                value: /^\d{6,}$/,
                message: "Пароль должен состоять из 6 или более цифр",
              },
            })}
          />

          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
      )}

      <button type="submit" className={styles.button}>
        Submit
      </button>

      {isSubmitted && (
        <p className={styles.message}>Спасибо, ваши данные приняты!</p>
      )}
    </form>
  );
}
