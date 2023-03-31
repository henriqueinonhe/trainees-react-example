import cx from "./DashboardEntry.module.scss";
import { Button } from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import Link from "next/link";
import { routes } from "@/routing/routes";

export const DashboardEntry = ({ entry, onDelete }) => {
  const { label, date, amount } = entry;

  const { formatDate, formatNumber } = useTranslation();

  return (
    <li className={cx.container} data-testid={`DashboardEntry`}>
      <div className={cx.leftRow}>
        <span data-testid="DashboardEntryLabel">{label}</span>

        <span data-testid="DashboardEntryDate">{formatDate(date)}</span>
      </div>

      <div className={cx.rightRow}>
        <span data-testid="DashboardEntryAmount">$ {formatNumber(amount)}</span>

        <div className={cx.buttonContainer}>
          <Link href={routes.editEntry(entry.id)}>
            <Button className={cx.editButton} data-testid="EditEntryButton" >✏️</Button>
          </Link>

          <Button className={cx.deleteButton} onClick={onDelete} data-testid="DeletEntryButton" >
            🗑️
          </Button>
        </div>
      </div>
    </li>
  );
};
