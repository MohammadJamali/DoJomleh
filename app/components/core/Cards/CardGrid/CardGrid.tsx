// import styles from './CardGrid.module.css'

// interface Props {
//     children?: React.ReactNode;
// }

// export default function CardGrid({children} : Props) {
//     return (<section className={styles.grid}>
//         {children}
//     </section>)
// }

import styles from './CardGrid.module.css';
import { ReactNode } from 'react';

interface CardGridProps {
    children?: ReactNode;
    ariaLabel?: string;
    minColumnWidth?: string | number;
    maxWidth?: string | number;
    gap?: string | number;
}

export default function CardGrid({
    children,
    ariaLabel = "Card grid",
    minColumnWidth = "200px",
    maxWidth = "1200px",
    gap = "2rem"
}: CardGridProps) {
    return (
        <section 
            className={styles.grid}
            aria-label={ariaLabel}
            role="grid"
            style={{
                '--min-col-width': typeof minColumnWidth === 'number' ? `${minColumnWidth}px` : minColumnWidth,
                '--max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
                '--gap': typeof gap === 'number' ? `${gap}px` : gap,
            } as React.CSSProperties}
        >
            {children}
        </section>
    );
}