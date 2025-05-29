export async function joinSpace(spaceId) {
    try {
        const res = await fetch('/api/spaces/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ spaceId }),
            credentials: 'include',
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to join space');
        }

        return await res.json();
    } catch (error) {
        console.error('Error joining space:', error);
        throw error;
    }
}

export async function leaveSpace(spaceId) {
    try {
        const res = await fetch('/api/spaces/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ spaceId }),
            credentials: 'include',
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to leave space');
        }

        return await res.json();
    } catch (error) {
        console.error('Error leaving space:', error);
        throw error;
    }
}

export async function getSpaceMemberships(spaceId) {
    try {
        const res = await fetch(`/api/spaces/${spaceId}/members`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to fetch space members');
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching space members:', error);
        throw error;
    }
}

export async function isUserSpaceMember(spaceId) {
    try {
        const res = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            return false;
        }

        const { user } = await res.json();
        if (!user || !user.spaces) {
            return false;
        }        
        
        const userSpaceIds = user.spaces.map(({id}) => (id))
        return userSpaceIds.includes(spaceId);
    } catch (error) {
        console.error('Error checking space membership:', error);
        return false;
    }
}

export const getLastVisitedSpace = async (userId) => {
    try {
        const res = await fetch(`/api/users/${userId}`)
        const data = await res.json()

        return data.lastVisitedSpace || null
    } catch (error) {
        console.error('Error getting last visited space:', error)
        return null
    }
}

export const setLastVisitedSpace = async (userId, spaceId) => {

    try {
        await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastVisitedSpace: spaceId
            })
        })
    } catch (error) {
        console.error('Error setting last visited space:', error)
    }
}

export const clearLastVisitedSpace = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('lastVisitedSpace')
}