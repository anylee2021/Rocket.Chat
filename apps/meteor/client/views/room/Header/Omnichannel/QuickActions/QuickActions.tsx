import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { Header } from '@rocket.chat/ui-client';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { memo, FC, ComponentProps } from 'react';

import { useQuickActions } from './hooks/useQuickActions';

type QuickActionsProps = {
	room: IOmnichannelRoom;
	className?: ComponentProps<typeof Box>['className'];
};

const QuickActions: FC<QuickActionsProps> = ({ room, className }) => {
	const t = useTranslation();
	const { visibleActions, actionDefault } = useQuickActions(room);

	return (
		<Header.ToolBox aria-label={t('Omnichannel_quick_actions')} mie={0}>
			{visibleActions.map(({ id, color, icon, title, action = actionDefault }, index) => {
				const props = {
					id,
					icon,
					color,
					title: t(title),
					className,
					index,
					primary: false,
					action,
					key: id,
				};

				return <Header.ToolBox.Action {...props} />;
			})}
			{visibleActions.length > 0 && <Header.ToolBox.Divider />}
		</Header.ToolBox>
	);
};

export default memo(QuickActions);
