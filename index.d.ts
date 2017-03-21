/**
 *  node-steamcommunity typings : https://github.com/DoctorMcKay/node-steamcommunity
 */

declare namespace SteamCommunity {

    type EventType = "ChatEvent" | "OtherEvent" | "PartyEvent" | "MeetingEvent" | "SpecialCauseEvent" |  "MusicAndArtsEvent" | "SportsEvent" |  "TripEvent";
    type AvatarSizeType = "full" | "medium" | "small";
    type ProtocolType = "http://" | "https://";
    type ImageFormat = "jpg" | "jpeg" | "gif" | "png";

    /**
     * CConfirmation: https://github.com/DoctorMcKay/node-steamcommunity/wiki/CConfirmation
     */
    class CConfirmation{
        id:             string;
        key:            string;
        title:          string;
        receiving:      string;
        time:           string;
        icon:           string;

        getOfferID(time: number, key: string, callback: (err: Error, offerId: string) => any);
        respond(time: number, key: string, accept: boolean, callback: (err: Error) => any);
    }

    /**
     * CMarketItem: https://github.com/DoctorMcKay/node-steamcommunity/wiki/CMarketItem
     */
    class CMarketItem{
        commodity: boolean;
        commodityID: string;
        medianSalePrices: {
            hour: Date,
            price: number,
            quantity: number
        };

        quantity: number;
        lowestPrice: number;
        buyQuantity: number;
        highestBuyOrder: number;

        updatePrice();
        updatePrice(callback: (err: Error) => any);
    }

    /**
     * CMarketSearchResult: https://github.com/DoctorMcKay/node-steamcommunity/wiki/CMarketSearchResult
     */
    class CMarketSearchResult{
        appid: string;
        market_hash_name: string;
        image: string;
        price: number;
        quantity: number;
    }

    /**
     * CSteamGroup: https://github.com/DoctorMcKay/node-steamcommunity/wiki/CSteamGroup
     */
    class CSteamGroup{
        steamID: SteamID;
        name: string;
        url: string;
        headline: string;
        summary: any;
        avatarHash: string;
        members: number;
        membersInChat: number;
        membersInGame: number;
        membersOnline: number;

        getAvatarURL(): string;
        getAvatarURL(size: AvatarSizeType, protocol: ProtocolType): string;

        getMembers(callback: (err: Error, members: SteamID[]) => any);
        getMembers(addresses: string[],callback: (err: Error, members: SteamID[]) => any);

        join();
        join(callback: (err: Error) => any);

        leave();
        leave(callback: (err: Error) => any);

        postAnnouncement(headline: string, content: string, callback: (err: Error) => any);

        scheduleEvent(name: string, type: EventType, description: string, time: Date );
        scheduleEvent(name: string, type: EventType, description: string, time: Date, server: string, callback: (err: Error) => any);

        setPlayerOfTheWeek(steamID: SteamID);
        setPlayerOfTheWeek(steamID: SteamID, callback: (err: Error, oldPOTW: SteamID, newPOTW: SteamID) => any);

        kick(steamID: SteamID);
        kick(steamID: SteamID, callback: (err: Error) => any);

        getHistory(page: number);
        getHistory(page: number, callback: (err: Error, history: any) => any); // TODO : typing for history

        getAllAnnouncements(callback: (err: Error, announcements: any) => any);             // TODO : typing for announcements
        getAllAnnouncements(time: Date, callback: (err: Error, announcements: any) => any); // TODO : same as above

        editAnnouncement(announcementID: string, headline: string, content: string);
        editAnnouncement(announcementID: string, headline: string, content: string, callback: (err: Error) => any);

        deleteAnnouncement(announcementID: string);
        deleteAnnouncement(announcementID: string, callback: (err: Error) => any);
    }

    /**
     * CSteamUser: https://github.com/DoctorMcKay/node-steamcommunity/wiki/CSteamUser
     */
    class CSteamUser{
        steamID: SteamID;
        name: string;
        onlineState: "in-game" | "online" | "offline";
        stateMessage: string;
        privacyState: "public" | "friendsonly" | "private";
        visibilityState: number;
        avatarHash: string;
        vacBanned: boolean;
        tradeBanState: "None" | "Probation" | "Banned";
        isLimitedAccount: boolean;
        customURL: string;
        memberSince: Date;
        location: string;
        realName: string;
        summary: any;
        groups: SteamID[];
        primaryGroup: SteamID;

        getAvatarURL(): string;
        getAvatarURL(size: AvatarSizeType, protocol: ProtocolType): string;

        addFriend();
        addFriend(callback: (err: Error) => any);

        acceptFriendRequest();
        acceptFriendRequest(callback: (err: Error) => any);

        removeFriend();
        removeFriend(callback: (err: Error) => any);

        blockCommunication();
        blockCommunication(callback: (err: Error) => any);

        unblockCommunication();
        unblockCommunication(callback: (err: Error) => any);

        comment(message: string);
        comment(message: string, callback: (err: Error) => any);

        inviteToGroup(groupID: SteamID);
        inviteToGroup(groupID: SteamID, callback: (err: Error) => any);

        getInventoryContexts(callback: (err: Error, apps: any) => any);

        getInventory(
            appID: string,
            contextID: string,
            tradableOnly: boolean,
            callback: (err: Error, inventory: TradeOfferManager.EconItem[], currencies: TradeOfferManager.EconItem[]) => any
        );

    }

    interface Options{
        request: Express.Request;
        timeout: number;
        userAgent: string;
        localAddress: string;
    }

    interface LoginOptions{
        accountName: string;
        password: string;
        steamguard?: string;
        authCode?: string;
        twoFactorCode?: string;
        captcha?: string;
    }

    interface Notifications {
        comments: number;
        items: number;
        invites: number;
        gifts: number;
        chat: number;
        trades: number;
    }

    interface MarketSearchOptions {
        query: string;
        appid: string;
        searchDescriptions: boolean;
    }

    interface EditProfileSettings{
        name: string;
        realName: string;
        summary: any;
        country: string;
        state: string;
        city: string;
        customURL: string;
        background: string;
        featuredBadge: string;
        primaryGroup: SteamID;
    }

    enum PrivacyState {
        Invalid     = 0,
        Private     = 1,
        FriendsOnly = 2,
        Public      = 3
    }

    interface ProfileSetting {
        profile: SteamCommunity.PrivacyState;
        comments: SteamCommunity.PrivacyState;
        inventory: SteamCommunity.PrivacyState;
        inventoryGifts: boolean;
    }

    interface InventoryHistoryOptions {
        page: number;
        resolveVanityURLs: any;
        inventoryhistory: any;
    }

    interface TradeHistory{
        onHold: boolean;
        date: Date;
        partnerName: string;
        partnerSteamID: SteamID;
        partnerVanityURL: string;
        itemsReceived: TradeOfferManager.EconItem[];
        itemsGiven: TradeOfferManager.EconItem[];
    }

    interface InventoryHistory{
        first: number;
        last: number;
        totalTrades: number;
        trades: TradeHistory[];
    }

    interface EnableTwoFactorResponse{
        status: number;
        shared_secret: string;
        identity_secret: string;
        revocation_code: string;
    }

}

declare class SteamCommunity {

    steamID: SteamID;

    constructor();
    constructor(options: SteamCommunity.Options);

    on(event: string, callback: any);

    login(options: SteamCommunity.LoginOptions, callback: (err: Error, sessionID: string, cookies: any, steamguard: string, oAuthToken: string) => any);

    oAuthLogin(steamguard: string, oAuthToken: string, callback: (err: Error, sessionID: string, cookies: any) => any);

    loggedIn(callback: (err: Error, loggedIn: boolean, familyView: boolean) => any);

    setCookies(cookies: any);

    getWebApiKey(domain: string, callback: (err: Error, key: string) => any);

    getWebApiOauthToken(callback: (err: Error, token: string) => any);

    parentalUnlock(pin: string);
    parentalUnlock(pin: string, callback: (err: Error, message: string) => any);

    getNotifications(callback: (err: Error, notifications: SteamCommunity.Notifications) => any);

    resetItemNotifications();
    resetItemNotifications(callback: (err: Error) => any);

    getSessionID(): string;

    getSteamUser(id: SteamID | string, callback: (err: Error, user: SteamCommunity.CSteamUser) => any);

    getSteamGroup(id: SteamID | string, callback: (err: Error, group: SteamCommunity.CSteamGroup) => any);

    getMarketApps(callback: (err: Error, apps: any) => any);

    getMarketItem(appid: string, hashName: string, callback: (err: Error, item: SteamCommunity.CMarketItem) => any);

    marketSearch(options: SteamCommunity.MarketSearchOptions, callback: (err: Error, items: SteamCommunity.CMarketSearchResult[]) => any);

    setupProfile();
    setupProfile(callback: (err: Error) => any);

    editProfile(settings: SteamCommunity.EditProfileSettings);
    editProfile(settings: SteamCommunity.EditProfileSettings, callback: (err: Error) => any);

    profileSettings(settings: SteamCommunity.ProfileSetting);
    profileSettings(settings: SteamCommunity.ProfileSetting, callback: (err: Error) => any);


    uploadAvatar(image: string);
    uploadAvatar(image: Buffer | string, format: SteamCommunity.ImageFormat);
    uploadAvatar(image: Buffer | string, format: SteamCommunity.ImageFormat, callback: (err: Error, url: string) => any);

    getInventoryHistory(callback: (err: Error, history: SteamCommunity.InventoryHistory) => any);
    getInventoryHistory(options: SteamCommunity.InventoryHistoryOptions, callback: (err: Error, history: SteamCommunity.InventoryHistory) => any);

    enableTwoFactor(callback: (err: Error, response: SteamCommunity.EnableTwoFactorResponse) => any);
    finalizeTwoFactor(shared_secret: string, activationCode: string, callback: (err: Error) => any)
    disableTwoFactor(revocationCode: string, callback: (err: Error) => any)

    getConfirmations(time: number, key: string, callback: (err: Error, confirmations: SteamCommunity.CConfirmation[]) => any);
    getConfirmationOfferID(confID: string, time: number, key: string, callback: (err: Error, offerId: string) => any)
    respondToConfirmation(confID: string, confKey: string, time: number, key: string, accept: boolean, callback: (err: Error) => any)

    startConfirmationChecker(pollInterval: number);
    startConfirmationChecker(pollInterval: number, identitySecret: string);
    stopConfirmationChecker();
    checkConfirmations();

}

declare module "steamcommunity" {
    export  = SteamCommunity;
}