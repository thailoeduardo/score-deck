<x-app-layout>
    <x-slot name="header">
        <h2 class="text-center text-xl text-gray-200 leading-tight">
            {{ __('Sala(s)') }}
        </h2>
    </x-slot>

    <div class="flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden mx-auto mb-8">
        <div class="w-full max-w-lg">
            <ul class="list bg-base-100 rounded-box shadow-md mb-5">
                @foreach ($rooms as $room)
                <li class="list-row">
                    <div>
                        <img class="size-10" src="data:image/png;base64,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" alt="controller">
                    </div>

                  <div>
                    <div>Sala {{ $room['id'] }}</div>
                    <div class="text-xs uppercase font-semibold opacity-60">Disponível</div>
                  </div>

                  <a href="/room/{{ $room['id'] }}" class="btn btn-outline btn-secondary">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </a>
                </li>
                @endforeach
              </ul>

            <section>
                <form action="/rooms" method="post">
                    @csrf

                    <x-primary-button class="w-full">{{ __('Criar sala') }}</x-primary-button>
                </form>
            </section>
        </div>
    </div>
</x-app-layout>
