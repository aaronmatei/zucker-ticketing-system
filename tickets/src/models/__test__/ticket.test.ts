import { Ticket } from "./../Ticket";

it('impliments optimistic concurrency controll', async (done) => {
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: "12345678"
    })

    await ticket.save()

    const v1 = await Ticket.findById(ticket.id);
    const v2 = await Ticket.findById(ticket.id);

    v1!.set({ price: 10 });
    v2!.set({ price: 15 });

    await v1!.save();


    // expect(async () => {
    //     await v2!.save();
    // }).toThrow();
    try {
        await v2!.save();

    } catch (error) {
        return done();

    }
    throw new Error("Should not reach here");

})

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 25,
        userId: "12345678"
    })

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);

})