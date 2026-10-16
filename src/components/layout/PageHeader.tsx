import { MoreMenu } from '../../features/birthday-reveal/MoreMenu';
import type { ReactNode } from 'react';
import './PageHeader.css';

type PageHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <div className="page-header__action">{action ?? <MoreMenu />}</div>
    </header>
  );
}
