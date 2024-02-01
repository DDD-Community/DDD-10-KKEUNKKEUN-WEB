import { TextAreaProps } from '@/types/element';
import { forwardRef } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ theme, value, ...rest }, ref) => {
    let themeClassName: string | undefined;

    if (theme === 'presentation_memo') {
      themeClassName = `${classNames([styles.presentationTextArea, styles.scriptMemo])}`;
    }
    if (theme === 'presentation_script') {
      themeClassName = `${classNames([
        styles.presentationTextArea,
        styles.scriptTextarea,
        (value as string[]).length > 5000 && styles.warning,
      ])}`;
    }

    return <textarea ref={ref} className={themeClassName} {...rest} />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
