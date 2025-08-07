import styles from './CustomButton.module.css'
import Link from 'next/link';

import {
    PlusIcon
} from "@heroicons/react/24/outline";
import { SVGProps } from 'react';


export interface CustomButtonProps {
    Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
    iconStart?: boolean;
    iconOutline?: boolean;
    iconShadow?: boolean;
    iconWidth?: number;
    iconHeight?: number;
    iconPadding?: number;
    iconColor?: number;
    iconBackgroundColor?: number;

    title?: string;
    label?: string;
    boldTitle?: boolean;
    spacebetween?: boolean;
    href?: string;

    borderStyle?: string;
    borderColor?: number;
    borderWidth?: number;
    padding?: number;
    color?: number;
    backgroundColor?: number;
}

export function CustomButton({
    Icon,
    iconColor,
    iconStart = true,
    iconOutline = true,
    iconShadow = false,
    iconBackgroundColor,
    title,
    label,
    iconWidth = 32,
    iconHeight = 32,
    iconPadding = 4,
    padding = 8,
    boldTitle,
    backgroundColor,
    borderColor,
    borderWidth,
    borderStyle,
    href,
    color,
    spacebetween,
}: CustomButtonProps) {
    Icon ??= PlusIcon;

    let iconObj = <Icon
        className={`
            ${styles.icon} 
            ${iconOutline && styles.iconOutline} 
            ${iconShadow && styles.iconShadow}
        `}
        style={{
            width: iconWidth,
            height: iconHeight,
            padding: iconPadding,
            color: iconColor ? iconColor.toString(16) : undefined,
            backgroundColor: iconBackgroundColor ? `#${iconBackgroundColor.toString(16)}` : undefined
        }} />

    let buttonContent = <>
        {Icon && iconStart === true ? iconObj : null}
        <div className={styles.dataContainer}>
            {title && <p
                className={styles.title}
                style={{
                    fontWeight: boldTitle ? 600 : 400,
                    marginLeft: iconStart ? 12 : 14,
                    marginRight: iconStart ? 14 : 12,
                }}>{title}</p>}
            {label && <p
                className={styles.label}
                style={{
                    marginLeft: iconStart ? 12 : 14,
                    marginRight: iconStart ? 14 : 12,
                }}>{label}</p>}
        </div>
        {Icon && iconStart === false ? iconObj : null}
    </>

    let rootStyle = {
        padding: padding,
        color: color ? `#${color.toString(16)}` : undefined,
        backgroundColor: backgroundColor ? `#${backgroundColor.toString(16)}` : undefined,

        borderStyle: borderStyle ? borderStyle : undefined,
        borderWidth: borderWidth ? borderWidth : undefined,
        borderColor: borderColor ? `#${borderColor.toString(16)}` : undefined,

        justifyContent: spacebetween ? "space-between" : undefined
    }

    let rootObj = href ?
        <Link
            href={href}
            className={`${styles.root}`}
            style={rootStyle}
        >{buttonContent}
        </Link> :
        <div
            className={styles.root}
            aria-label={title}
            style={rootStyle}>
            {buttonContent}
        </div>

    return rootObj;
}