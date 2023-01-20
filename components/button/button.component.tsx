import styles from "@/components/header/header.module.scss";

interface ButtonProps {
  title: string;
  style: string;
}

export const Button = ({ title, style }: ButtonProps) => {
  return <button className={style}>{title}</button>;
};
