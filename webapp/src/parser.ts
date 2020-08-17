interface Participant {
    name: string,
    loot: number,
    supplies: number,
    balance: number,
    damage: number
    healing: number
}

interface ParticipantWithBalance {
    name: string,
    balance: number
}

interface Payment {
    from: string,
    to: string,
    amount: number
}

interface Result {
    profitPerPerson: number,
    payments: Payment[]
}

const partition = (arr: string[], num: number): string[][] =>
    arr.length ? [arr.splice(0, num)].concat(partition(arr, num)) : [];

const findValue = (arr: string[], label: string): number => {
    const line = arr.filter(a => a.indexOf(label) !== -1)[0]
    return parseFloat(line.split(':')[1].replace(/,/g, ''))
}
const parsePlayer = (arr: string[]): Participant => ({
    name: arr[0].replace(' (Leader)', ''),
    loot: findValue(arr, 'Loot'),
    supplies: findValue(arr, 'Supplies'),
    balance: findValue(arr, 'Balance'),
    damage: findValue(arr, 'Damage'),
    healing: findValue(arr, 'Healing')
})

const splitProfit = (participants: Participant[]): Result => {
    const totalProfit = participants.map(participant => participant.balance).reduce((a, b) => a + b, 0);
    const profitPerPerson = Math.floor(totalProfit / participants.length);

    const balances = participants.map(p => ({ name: p.name, balance: p.balance - profitPerPerson }));

    const overProfit = balances.filter(p => p.balance > 0);
    const underProfit = balances.filter(p => p.balance < 0);

    const payments = underProfit.flatMap(up => {
        const ret: Payment[] = [];
        while (up.balance < 0) {
            const payer = overProfit.pop();
            if (payer == null) {
                throw Error();
            }

            const amount = payer.balance >= -up.balance ? -up.balance : payer.balance;
            payer.balance -= amount;
            up.balance += amount;
            ret.push({ from: payer.name, to: up.name, amount })
            if (payer.balance > 0) {
                overProfit.push(payer);
            }
        }
        return ret;
    });

    return { profitPerPerson, payments }
}

export const parseSessionData = (input: string): Result => {
    if (!input) {
        return { profitPerPerson: 0, payments: [] };
    }

    const lines = input.split('\n');

    const partitions = partition(lines, 6);
    partitions.shift();

    if (partitions.length === 0) {
        return { profitPerPerson: 0, payments: [] };
    }

    const participants = partitions.map(parsePlayer);

    return splitProfit(participants);
}