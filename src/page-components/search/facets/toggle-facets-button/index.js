import React from 'react';
import { useT } from 'lib/i18n';
import { Button, Text } from './styles';
import IconFilters from 'ui/icons/filters';

export const ButtonToggleFacets = React.forwardRef(
  ({ areFacetsShown, ...rest }, ref) => {
    const t = useT();
    const textToggleFacetsButton = areFacetsShown
      ? t('common.close')
      : t('search.filter');

    return (
      <Button
        {...rest}
        ref={ref}
        style={{
          '--color-background': 'white',
          '--color-text': 'var(--color-primary-action-content)',
          '--color-background-hover': '#f7f7f7',
          '--color-text-hover': 'var(--color-primary-action-content)'
        }}
      >
        <Text>{textToggleFacetsButton}</Text>
        <IconFilters />
      </Button>
    );
  }
);

ButtonToggleFacets.displayName = 'ButtonToggleFacets';
