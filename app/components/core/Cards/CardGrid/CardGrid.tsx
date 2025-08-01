import styles from './CardGrid.module.css'

interface Props {
    children?: React.ReactNode;
}

export default function CardGrid({children} : Props) {
    return (<section className={styles.grid}>
        {children}
    </section>)
}