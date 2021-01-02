/*
MIT License

Copyright (c) 2017 React Navigation Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * From: https://github.com/react-navigation/react-navigation/blob/47f28558d6e94bb5c42a2de88bd3d99f09e9d5bd/packages/drawer/src/views/TouchableItem.tsx
 *
 * TouchableItem provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity to handle platform differences.
 *
 * On Android, you can pass the props of TouchableNativeFeedback.
 * On other platforms, you can pass the props of TouchableOpacity.
 */
import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, ViewProps } from 'react-native';

export type Props = ViewProps & {
    pressColor?: string;
    disabled?: boolean | null;
    borderless?: boolean;
    delayPressIn?: number;
    onPress?: () => void;
    children: React.ReactNode;
};

const ANDROID_VERSION_LOLLIPOP = 21;

export default function TouchableItem({ borderless = false, pressColor = 'rgba(0, 0, 0, .32)', style, children, ...rest }: Props) {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
        return (
            <TouchableNativeFeedback
                {...rest}
                useForeground={TouchableNativeFeedback.canUseNativeForeground()}
                background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
                <View style={style}>{React.Children.only(children)}</View>
            </TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableOpacity style={style} {...rest}>
                {children}
            </TouchableOpacity>
        );
    }
}
