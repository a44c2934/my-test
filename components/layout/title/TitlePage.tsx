import styles from './titlePage.module.css'
export default function TitlePage({ name }: TitlePageProps) {
  return (
    <div className={styles.title}>
      <h1>{name}</h1>
    </div>
  )
}
