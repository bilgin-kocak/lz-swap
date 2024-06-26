import {
  getConnectorIcon,
  isWalletInstalled,
  isWalletInstalledAsync,
} from '@lifi/wallet-management';
import type { Theme } from '@mui/material';
import { Avatar, useMediaQuery, useTheme } from '@mui/material';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccountConnect } from 'src/hooks/useAccounts';
import type { CombinedWallet } from 'src/hooks/useCombinedWallets';
import { useCombinedWallets } from 'src/hooks/useCombinedWallets';
import { useMenuStore, useSettingsStore } from 'src/stores';
import type { MenuListItem } from 'src/types';
import { getContrastAlphaColor } from 'src/utils';

export const useWalletSelectContent = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { combinedInstalledWallets, combinedNotDetectedWallets } =
    useCombinedWallets();
  const isDesktopView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm'),
  );
  const connect = useAccountConnect();

  const { setSnackbarState, closeAllMenus, setEcosystemSelectMenuState } =
    useMenuStore((state) => state);
  const { onWelcomeScreenClosed } = useSettingsStore((state) => state);

  const availableWallets = useMemo(() => {
    let allowedWallets = combinedInstalledWallets.slice(0, 7);

    if (isDesktopView) {
      allowedWallets = [
        ...combinedInstalledWallets,
        ...combinedNotDetectedWallets,
      ];
    }

    return allowedWallets;
  }, [combinedInstalledWallets, combinedNotDetectedWallets, isDesktopView]);

  const connectWallet = useCallback(
    async (combinedWallet: CombinedWallet) => {
      if (combinedWallet.evm && combinedWallet.svm) {
        setEcosystemSelectMenuState(true, combinedWallet);
        return;
      } else if (combinedWallet.evm || combinedWallet.svm) {
        await connect(combinedWallet);
      } else {
        setSnackbarState(
          true,
          t('navbar.walletSelectMenu.ecosystemSelectMenu.noEcosystemAdapter'),
          'error',
        );
      }
      closeAllMenus();
      onWelcomeScreenClosed(true);
    },
    [
      closeAllMenus,
      onWelcomeScreenClosed,
      setEcosystemSelectMenuState,
      connect,
      setSnackbarState,
      t,
    ],
  );

  const walletMenuItems = useMemo<MenuListItem[]>(() => {
    const handleWalletClick = async (combinedWallet: CombinedWallet) => {
      if (
        isWalletInstalled(combinedWallet.evm?.id || '') ||
        (await isWalletInstalledAsync(combinedWallet.evm?.id || '')) ||
        (combinedWallet.svm &&
          combinedWallet.svm.adapter.readyState === WalletReadyState.Installed)
      ) {
        connectWallet(combinedWallet);
      } else {
        closeAllMenus();
        setSnackbarState(
          true,
          t('navbar.walletMenu.walletNotInstalled', {
            wallet:
              (combinedWallet.evm?.id || combinedWallet.svm?.adapter.name) ??
              '',
          }),
          'error',
        );
      }
    };

    const output = availableWallets.map((combinedWallet) => {
      return {
        label:
          (combinedWallet.evm?.name || combinedWallet.svm?.adapter.name) ?? '',
        prefixIcon: (
          <Avatar
            className="wallet-select-avatar"
            src={
              getConnectorIcon(combinedWallet.evm) ||
              combinedWallet.evm?.icon ||
              combinedWallet.svm?.adapter.icon
            }
            alt={`${
              combinedWallet.evm?.id || combinedWallet.svm?.adapter.name
            }-wallet-logo`}
            sx={{
              height: 40,
              width: 40,
              objectFit: 'contain',
            }}
          />
        ),
        showMoreIcon: false,
        onClick: () => {
          handleWalletClick(combinedWallet);
        },
        styles: {
          '&:hover': {
            backgroundColor: getContrastAlphaColor(theme, '16%'),
          },
        },
      };
    });
    return output;
  }, [
    availableWallets,
    connectWallet,
    closeAllMenus,
    setSnackbarState,
    t,
    theme,
  ]);

  return walletMenuItems;
};
