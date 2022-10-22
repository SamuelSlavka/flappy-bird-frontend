import React, { FC } from 'react';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

interface NavItemProps {
  name: string,
  link?: string,
  icon: IconDefinition,
}

const NavItem: FC<NavItemProps> = (props) => {

  const redirect = (link?: string) => {
    if(link) {
      const [prefix, domain] = window.location.href.split('//');
      const subdomains = domain.split('.');
      const newHref = `${prefix}//${link}.${subdomains[subdomains.length-2]}.${subdomains[subdomains.length-1]}`;
      window.location.href = newHref;
    }
  }

  return (
    <button onClick={() => redirect(props.link)} className={`${styles.card} text-2xl p-2 m-2 md:p-4 md:m-4 lg:m-6 rounded relative hover:text-dark`} data-testid="NavItem">
      <section className={`${styles.cardContent} p-2 md:p-4 lg:px-6 lg:py-4 relative z-20`}>
        <FontAwesomeIcon icon={props.icon} />
        <span className="px-4">
          {props.name}
        </span>
      </section>
    </button>
  );
};

export default NavItem;
